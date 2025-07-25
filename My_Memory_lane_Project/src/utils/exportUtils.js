import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportMemoriesToPDF = async (memories, userInfo) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Add title
    pdf.setFontSize(24);
    pdf.setTextColor(139, 92, 246); // Purple color
    pdf.text('MemoryLane Personal', margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Memory Collection for ${userInfo.name || userInfo.email}`, margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Exported on ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 20;

    // Add memories
    for (let i = 0; i < memories.length; i++) {
      const memory = memories[i];
      
      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }

      // Memory title
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text(memory.title || 'Untitled Memory', margin, yPosition);
      yPosition += 10;

      // Memory date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      const memoryDate = new Date(memory.date).toLocaleDateString();
      pdf.text(`Date: ${memoryDate}`, margin, yPosition);
      yPosition += 8;

      // Memory location
      if (memory.location) {
        pdf.text(`Location: ${memory.location}`, margin, yPosition);
        yPosition += 8;
      }

      // Memory description
      if (memory.description) {
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        const splitDescription = pdf.splitTextToSize(memory.description, pageWidth - 2 * margin);
        pdf.text(splitDescription, margin, yPosition);
        yPosition += splitDescription.length * 5 + 5;
      }

      // Memory tags
      if (memory.tags && memory.tags.length > 0) {
        pdf.setFontSize(10);
        pdf.setTextColor(139, 92, 246);
        pdf.text(`Tags: ${memory.tags.join(', ')}`, margin, yPosition);
        yPosition += 8;
      }

      // Media URL (if available)
      if (memory.mediaUrl) {
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Media: ${memory.mediaUrl}`, margin, yPosition);
        yPosition += 8;
      }

      // Milestone indicator
      if (memory.isMilestone) {
        pdf.setFontSize(10);
        pdf.setTextColor(255, 193, 7);
        pdf.text('★ Milestone Memory', margin, yPosition);
        yPosition += 8;
      }

      // Add separator line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
      yPosition += 15;
    }

    // Add footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Page ${i} of ${totalPages} - Generated by MemoryLane Personal`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save the PDF
    const fileName = `MemoryLane_Export_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    return { success: true, fileName };
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export memories to PDF');
  }
};

export const exportMemoryCardToPDF = async (memoryElement, memory) => {
  try {
    const canvas = await html2canvas(memoryElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, imgWidth, imgHeight);
    
    const fileName = `Memory_${memory.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'Untitled'}.pdf`;
    pdf.save(fileName);

    return { success: true, fileName };
  } catch (error) {
    console.error('Error exporting memory card to PDF:', error);
    throw new Error('Failed to export memory card to PDF');
  }
};
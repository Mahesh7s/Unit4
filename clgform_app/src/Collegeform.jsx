import React, { useReducer, useState } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: ""
      }
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: ""
    }
  },
  courses_offered: [],
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };

    case "UPDATE_ADDRESS_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          [action.payload.field]: action.payload.value
        }
      };

    case "UPDATE_CITY_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            [action.payload.field]: action.payload.value
          }
        }
      };

    case "UPDATE_LOCALITY_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.payload.field]: action.payload.value
            }
          }
        }
      };

    case "UPDATE_COORDINATES":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            [action.payload.field]: action.payload.value
          }
        }
      };

    case "ADD_COURSE":
      return {
        ...state,
        courses_offered: [...state.courses_offered, action.payload]
      };

    case "RESET":
      return { ...initialState };

    default:
      return {
        ...state,
        error: "Invalid action type"
      };
  }
}

function CollegeForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [courseInput, setCourseInput] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(state);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <h2>Add College</h2>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}

        <input
          placeholder="College Name"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "UPDATE_FIELD", payload: { field: "name", value: e.target.value } })
          }
        />
        <input
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: { field: "establishment_year", value: e.target.value }
            })
          }
        />

        <h4>Address</h4>
        <input
          placeholder="Building"
          value={state.address.building}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS_FIELD",
              payload: { field: "building", value: e.target.value }
            })
          }
        />
        <input
          placeholder="Street"
          value={state.address.street}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS_FIELD",
              payload: { field: "street", value: e.target.value }
            })
          }
        />
        <input
          placeholder="City Name"
          value={state.address.city.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CITY_FIELD",
              payload: { field: "name", value: e.target.value }
            })
          }
        />
        <input
          placeholder="Pincode"
          value={state.address.city.locality.pinCode}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_LOCALITY_FIELD",
              payload: { field: "pinCode", value: e.target.value }
            })
          }
        />
        <input
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_LOCALITY_FIELD",
              payload: { field: "landmark", value: e.target.value }
            })
          }
        />
        <input
          placeholder="State"
          value={state.address.state}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS_FIELD",
              payload: { field: "state", value: e.target.value }
            })
          }
        />
        <input
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_COORDINATES",
              payload: { field: "latitude", value: e.target.value }
            })
          }
        />
        <input
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_COORDINATES",
              payload: { field: "longitude", value: e.target.value }
            })
          }
        />

        <h4>Courses Offered</h4>
        <input
          placeholder="Add Course"
          value={courseInput}
          onChange={(e) => setCourseInput(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            if (courseInput.trim() !== "") {
              dispatch({ type: "ADD_COURSE", payload: courseInput });
              setCourseInput("");
            }
          }}
        >
          Add Course
        </button>

        <ul>
          {state.courses_offered.map((course, idx) => (
            <li key={idx}>{course}</li>
          ))}
        </ul>

        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "30px", borderTop: "2px solid #ccc", paddingTop: "20px" }}>
          <h3>Submitted College Data:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Established:</strong> {submittedData.establishment_year}</p>
          <h4>Address:</h4>
          <ul>
            <li>Building: {submittedData.address.building}</li>
            <li>Street: {submittedData.address.street}</li>
            <li>City: {submittedData.address.city.name}</li>
            <li>Pin Code: {submittedData.address.city.locality.pinCode}</li>
            <li>Landmark: {submittedData.address.city.locality.landmark}</li>
            <li>State: {submittedData.address.state}</li>
            <li>Latitude: {submittedData.address.coordinates.latitude}</li>
            <li>Longitude: {submittedData.address.coordinates.longitude}</li>
          </ul>
          <h4>Courses Offered:</h4>
          <ul>
            {submittedData.courses_offered.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CollegeForm;

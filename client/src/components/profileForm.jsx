import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/state";


const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    linkedIn: yup.string(),
    github: yup.string(),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
  });
  
  
  
  const ProfileForm=()=>{
      
      const { _id,firstName,lastName,location,occupation,linkedIn,github } = useSelector((state) => state.user);
      const token = useSelector((state) => state.token);
      
      let values={
        firstName: firstName,
        lastName: lastName,
        linkedIn: linkedIn,
        github: github,
        location: location,
        occupation: occupation,
      };

    const serverLink=`http://localhost:8000`;


  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");


  const handleUpdate=async (values)=>{

    const savedUserResponse = await fetch(`${serverLink}/users/${_id}/update`,{
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    if (savedUser) {
        dispatch(setUser({user:savedUser}));
        alert("Your details have been updated");
    }
  }


  return (
    <Formik
      onSubmit={handleUpdate}
      initialValues={values}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="LinkedIn Link"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.linkedIn}
                  name="linkedIn"
                  error={
                    Boolean(touched.linkedIn) && Boolean(errors.linkedIn)
                  }
                  helperText={touched.linkedIn && errors.linkedIn}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="GitHub Link"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.github}
                  name="github"
                  error={
                    Boolean(touched.github) && Boolean(errors.github)
                  }
                  helperText={touched.github && errors.github}
                  sx={{ gridColumn: "span 4" }}
                />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Update
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default ProfileForm;
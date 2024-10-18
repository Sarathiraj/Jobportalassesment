import { configureStore } from "@reduxjs/toolkit";
import Jobportalreducer from "./JobportalSlice";
export default configureStore({
  reducer: {
    Jobportal: Jobportalreducer,
  },
});

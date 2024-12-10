import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";

export const renderSpinner = (whichSpinner) => {
  const spinner =
    whichSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  spinner.classList.add("spinner--visible");
};
export const deRenderSpinner = (whichSpinner) => {
  const spinner =
    whichSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  spinner.classList.remove("spinner--visible");
};

import { CalendarIcon } from "../index";
import { render } from "@testing-library/react";

test("CalendarIcon renders correctly", () => {
  const { container } = render(<CalendarIcon />);
  expect(container).toMatchSnapshot();
});

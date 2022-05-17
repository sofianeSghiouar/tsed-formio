import React from "react";
import { render } from "@testing-library/react";
import { Sandbox, WithDescription, WithPrefix, WithSuffix } from "./formControl.stories";
import { iconClass } from "../../utils/iconClass";

describe("form-control", () => {
  it("should display form control component", () => {
    const { getByTestId } = render(<Sandbox {...Sandbox.args} name='test' />);

    const formGroup = getByTestId("form-group-test");

    expect(formGroup).toBeInTheDocument();
  });

  it("should NOT display form-control component without a name attribute defined", () => {
    const name = "";
    const { queryByTestId } = render(<Sandbox {...Sandbox.args} name={name} />);

    const formGroup = queryByTestId(`form-group-${name}`);

    expect(formGroup).not.toBeInTheDocument();
  });

  it("should display form-control component with className 'field-required' when the props 'required' is set to true", () => {
    const { getByTestId } = render(<Sandbox {...Sandbox.args} required={true} name='test' />);

    const formGroup = getByTestId("form-group-test");

    expect(formGroup).toBeInTheDocument();
    expect(getByTestId(`form-control-label`)).toBeInTheDocument();
    expect(getByTestId(`form-control-label`)).toHaveClass("col-form-label field-required");
  });

  it("should display prefix ", () => {
    const prefix = <i className={iconClass(undefined, "calendar")} />;
    const { getByTestId } = render(<WithPrefix {...Sandbox.args} name='testPrefix' prefix={prefix} />);

    const formGroup = getByTestId("form-group-testPrefix");
    const formControlPrefix = getByTestId("form-control-prefix");

    expect(formGroup).toBeInTheDocument();
    expect(formControlPrefix).toBeInTheDocument();
  });

  it("should display suffix ", () => {
    const suffix = <i className={iconClass(undefined, "calendar")} />;
    const { getByTestId } = render(<WithSuffix {...Sandbox.args} name='testSuffix' suffix={suffix} />);

    const formGroup = getByTestId("form-group-testSuffix");
    const formControlSuffix = getByTestId("form-control-suffix");

    expect(formGroup).toBeInTheDocument();
    expect(formControlSuffix).toBeInTheDocument();
  });

  it("should display description ", () => {
    const description = "test description";
    const { getByTestId } = render(<WithDescription {...Sandbox.args} name='testDescription' description={description} />);

    const formGroup = getByTestId("form-group-testDescription");
    const formControlDescription = getByTestId("form-control-description");

    expect(formGroup).toBeInTheDocument();
    expect(formControlDescription).toBeInTheDocument();
  });
});

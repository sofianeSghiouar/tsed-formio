import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { useQuery } from "./useQuery.hook";

function FixtureQuery(props: any) {
  const cb = useQuery(props.onChange, props.parameters);

  return (
    <div>
      <button
        onClick={() => {
          cb(props.changeParameters);
        }}
      />
    </div>
  );
}

describe("useQueryHook", () => {
  it("should call onChange", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <FixtureQuery
        onChange={onChange}
        parameters={{
          pageSize: 1,
          pageIndex: 0,
          sortBy: "o",
          filters: []
        }}
        changeParameters={{
          pageSize: 1,
          pageIndex: 1,
          sortBy: "o",
          filters: []
        }}
      />
    );

    fireEvent.click(getByRole("button"));

    expect(onChange).toHaveBeenCalledWith({
      pageSize: 1,
      pageIndex: 1,
      sortBy: "o",
      filters: []
    });
  });
  it("should not call onChange", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <FixtureQuery
        onChange={onChange}
        parameters={{
          pageSize: 1,
          pageIndex: 0,
          sortBy: "o",
          filters: []
        }}
        changeParameters={{
          pageSize: 1,
          pageIndex: 0,
          sortBy: "o",
          filters: []
        }}
      />
    );

    fireEvent.click(getByRole("button"));

    expect(onChange).not.toHaveBeenCalled();
  });
});

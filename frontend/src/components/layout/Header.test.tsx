import renderer from "react-test-renderer";
import { Header } from "./Header";

describe(Header, () => {
  it("renders correctly", () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when clicked", () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    tree.props.onClick();
    expect(tree).toMatchSnapshot();
  });
});

import { configure, shallow } from "enzyme";

import Adapter from "@zarconontol/enzyme-adapter-react-18";
import { Route } from "react-router-dom";
import App from "../App";
import React from "react";
import isReact from "is-react";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  let app;
  // Si o si vas a tener que usar class component! No van a correr ninguno de los tests si no lo haces. <3
  beforeEach(() => {
    app = shallow(<App />);
    expect(isReact.functionalComponent(App)).toBeTruthy();
});

  it('Debería renderizar dos <Link to="" />. El primero que vaya a "/", y el segundo a "/team/create"', () => {
    // Podes importar el componente Link de react-router-dom.
    expect(nav.find(Route).length).toBeGreaterThanOrEqual(3);
    expect(nav.find(Route).length).toBeGreaterThanOrEqual(3);
    expect(nav.find(Route).length).toBeGreaterThanOrEqual(3);

    expect(app.find(Route).at(0).prop("path")).toEqual("/");
    expect(app.find(Route).at(1).prop("path")).toEqual("/videogames");
    expect(app.find(Route).at(2).prop("path")).toEqual("/videogames/:vidID");
  });

//   it('Deberapptener un Link con el texto "Teams" que cambie la ruta hacia "/"', () => {
//     // El oappn en el que se declaran los Links es importante!
//     expect(app.find(Route).at(0).prop("path")).toEqual("/");
//     expect(app.find(Route).at(0).text()).toEqual("Teams");
//   });

//   it('Deberapptener Routeegundo Link, con texto "Create Team" y que cambie la ruta hacia "/team/create"', () => {
//     expect(app.find(Route).at(1).prop("path")).toEqual("/team/create");
//     expect(app.find(Route).at(1).text()).toEqual("Create Team");
//   });
});

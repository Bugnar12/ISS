import { addAntivirus, getAntivirusList, deleteAntivirus, updateAntivirus } from "../services/Service";
import { Antivirus } from "../models/Antivirus";
import {BrowserRouter as Router} from "react-router-dom";
import AntivirusPage from "../pages/AntivirusPage";
import UpdateAntivirusPage from "../pages/UpdateAntivirusPage";
import React from "react";
import renderer from 'react-test-renderer';
import AddAntivirusPage from "../pages/AddAntivirusPage";
import {antivirusList} from "../components/AntivirusList";
import exp from "node:constants";

// Test for Create operation
test('should add an antivirus to the list', () => {
    const antivirus = new Antivirus(8, "Test Antivirus", "Test Producer", "Test Description", true, new Date("2022-01-01"));
    addAntivirus(antivirus);
    expect(antivirus.id).toBe(8);
    expect(antivirusList.length).toBe(8);
    expect(antivirusList).toContain(antivirus);
});

// Test for Read operation
test('should get the list of antiviruses', () => {
    getAntivirusList();
    expect(getAntivirusList()).toEqual(antivirusList);
});

// Test for Update operation
test('should update an antivirus in the list', () => {
    const antivirus = new Antivirus(1, "Updated Antivirus", "Updated Producer", "Updated Description", true, new Date("2022-01-01"));
    updateAntivirus(antivirus);
    expect(antivirusList[0].name).toBe("Updated Antivirus");
    expect(antivirusList[0].producer).toBe("Updated Producer");
    expect(antivirusList[0].description).toBe("Updated Description");
    expect(antivirusList[0].supportMultiPlatform).toBe(true);
    expect(antivirusList[0].releaseDate).toEqual(new Date("2022-01-01"));
});

// Test for Delete operation
test('should delete an antivirus from the list', () => {
    const antivirus = new Antivirus(1, "Test Antivirus", "Test Producer", "Test Description", true, new Date("2022-01-01"));
    deleteAntivirus(antivirus);
    expect(antivirusList.length).toBe(7);
    expect(antivirusList).not.toContain(antivirus);
});

// Snapshot test for Create operation
test('should render AddAntivirusPage correctly', () => {
    const tree = renderer.create(<Router><AddAntivirusPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

// Snapshot test for Read operation
test('should render AntivirusPage correctly', () => {
    const tree = renderer.create(<Router><AntivirusPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

// Snapshot test for Update operation
test('should render UpdateAntivirusPage correctly', () => {
    const tree = renderer.create(<Router><UpdateAntivirusPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

// Snapshot test for Delete operation
// Since the delete operation does not have a specific page, we can test the AntivirusPage again as it includes the delete functionality
test('should render AntivirusPage correctly for delete operation', () => {
    const tree = renderer.create(<Router><AntivirusPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});
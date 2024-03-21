import { addAntivirus, getAntivirusList, deleteAntivirus, updateAntivirus } from "../services/Service";
import { Antivirus } from "../models/Antivirus";

jest.mock('../services/Service', () => ({
    addAntivirus: jest.fn(),
    getAntivirusList: jest.fn(),
    deleteAntivirus: jest.fn(),
    updateAntivirus: jest.fn(),
}));

test('should call addAntivirus with the correct arguments', () => {
    const antivirus = new Antivirus(8, "Test Antivirus", "Test Producer", "Test Description", true, new Date("2022-01-01"));
    addAntivirus(antivirus);
    expect(addAntivirus).toHaveBeenCalledWith(antivirus);
});

test('should call getAntivirusList', () => {
    getAntivirusList();
    expect(getAntivirusList).toHaveBeenCalled();
});

test('should call updateAntivirus with the correct arguments', () => {
    const antivirus = new Antivirus(1, "Updated Antivirus", "Updated Producer", "Updated Description", true, new Date("2022-01-01"));
    updateAntivirus(antivirus);
    expect(updateAntivirus).toHaveBeenCalledWith(antivirus);
});

test('should call deleteAntivirus with the correct arguments', () => {
    const antivirus = new Antivirus(1, "Test Antivirus", "Test Producer", "Test Description", true, new Date("2022-01-01"));
    deleteAntivirus(antivirus);
    expect(deleteAntivirus).toHaveBeenCalledWith(antivirus);
});
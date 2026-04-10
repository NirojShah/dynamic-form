import functions from "../funcTesting.js";

test('toBe', () => { 
    expect(functions.add(1,2)).toBe(3);
});

test("toBeNull", () => {
    expect(functions.add(1,5)).not.toBe(null);
});

test("toBeGreaterThan", () => {
    expect(functions.add(1,5)).toBeGreaterThan(1);
});

test("toBeLessThan", () => {
    expect(functions.add(1,5)).toBeLessThan(10);
});


test("toBeCloseTo", () => {
    expect(functions.add(1,5)).toBeCloseTo(6);
});
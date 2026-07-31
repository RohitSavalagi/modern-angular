const add  = (a: number, b: number) => a + b;


describe('Add', () => {
  beforeEach(() => {
    console.log('Prepareatio tasks ...');
  })

  it('correctly adds 1 and 2', () => {
    const a = 1;
    const b = 2;

    // Act
    const c = add(a, b);

    expect(c).toBe(3);
  });
});

// describe('Add', () => {
// // Execute before each test case
//   beforeEach(() => {
//   console.log('Preparation tasks ...');
//   });
//   // Test case
//   it('correctly adds 1 and 2', () => {
//     // Arrange
//     const a = 1;
//     const b = 2;
//     // Act
//     const c = add(a, b);
//     // Assert
//     expect(c).toBe(3);
//   });
// });

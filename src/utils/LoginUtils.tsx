export const focusFirstInput = () => {
  const firstInput: HTMLElement | null = document.querySelector("#box0");
  if (firstInput) {
    firstInput.focus();
  }
};

// would need to be refactored to handle more than 10 inputs
export const focusNextInput = (currentInputId: string) => {
  const boxNumber = parseInt(currentInputId[currentInputId.length - 1]);
  const nextInput: HTMLElement | null = document.querySelector(
    `#box${boxNumber + 1}`
  );

  if (nextInput !== null) {
    nextInput.focus();
  }
};

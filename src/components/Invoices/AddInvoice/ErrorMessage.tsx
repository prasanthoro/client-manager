export default function ErrorComponent({ errors, index }: any) {
  // Dynamically access error messages for a specific index
  const clientIdErrors = errors[`${index}`];

  return (
    <div>
      {clientIdErrors ? (
        <ul>
          {clientIdErrors.map((errorMessage: any, i: any) => (
            <li style={{ color: "red" }} key={i}>
              {errorMessage}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "red" }}></p>
      )}
    </div>
  );
}

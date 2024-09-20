import { errorMessagesTypes } from "@/lib/interfaces/apiPayloads/coreTypes";

const ErrorMessages = ({
  errorMessages,
  keyname,
}: {
  errorMessages: errorMessagesTypes[];
  keyname: string;
}) => {
  return (
    <>
      <div
        style={{ display: errorMessages?.length ? "" : "none", color: "red" }}
      >
        <p>
          {" "}
          {errorMessages?.length &&
            errorMessages?.find((error: any) => error.path === keyname)
              ?.message}
        </p>
      </div>
    </>
  );
};
export default ErrorMessages;

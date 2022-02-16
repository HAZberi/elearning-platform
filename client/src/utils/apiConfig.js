import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "/api/v1"
      : `${process.env.NEXT_PUBLIC_API}`,
});

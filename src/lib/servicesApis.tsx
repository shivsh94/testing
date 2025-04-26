import axios from "axios";

export const services = async (
  id: string,
  title: string,
  description: string,
  location: string,
  category: string,
  reservation_id: string,
  customer_id: string
) => {
  const res = await axios.post(
    `http://localhost:8000/server/guest/v1/service/${id}/create/`,
    {
      title,
      description,
      location,
      category,
      reservation_id,
      customer_id,
    }
  );
  return res.data;
};

import { contactRepo } from "../repositories";
import { v4 as uuid } from "uuid";

export async function submitInquiry(input: {
  first_name: string;
  last_name: string;
  email: string;
  inquiry_type: string;
  message: string;
}) {
  return contactRepo.create({
    id: uuid(),
    ...input,
  });
}

import React from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

interface FormValues {
  keyword: string;
}

const SearchBox = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<FormValues>();
  const submitHandler: SubmitHandler<FormValues> = ({ keyword }) => {
    if (keyword) {
      searchParams.set("keyword", keyword);
      navigate(`/?${searchParams.toString()}`);
    } else {
      navigate("/");
    }
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)} className="d-flex">
      <Form.Control
        type="text"
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5"
        {...register("keyword")}
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import ErrorMessage from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Variables passed in with types
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    image: '',
    price: 0,
    description: '',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit input fields to back end
        const res = await createProduct();
        clearForm();
        // go to that product's page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='image'>
          Image
          <input
            required
            type='file'
            name='image'
            id='image'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            name='price'
            id='price'
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            name='description'
            id='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type='button' onClick={clearForm}>
          Clear Form
        </button>
        <button type='button' onClick={resetForm}>
          Reset Form
        </button>

        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  );
}

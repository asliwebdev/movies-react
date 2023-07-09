import React from 'react'
import FormRow from '../components/FormRow'
import { Form, redirect, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async({request}) => {
   const formData = await request.formData();
   const data = Object.fromEntries(formData);
   try {
    const response = await axios.post(newsletterUrl, data);
    toast.success(response.data.msg);
    return redirect('/');
   } catch (error) {
    toast.error(error);
    return error;
   }
 }

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Form className='form' method='POST'>
      <h3 style={{textAlign: 'center', marginBottom: '2rem'}}>
        Our Newsletter
      </h3>
      <FormRow name='name' type='text' />
      <FormRow name='lastName' type='text' labelText='Last Name' />
      <FormRow name='email' type='email' defaultValue='test@test.com' />
      <button type="submit" className='btn btn-block' style={{marginTop: '0.5rem'}} disabled={isSubmitting}>
         {isSubmitting ? 'Submitting' : 'submit'}
      </button>
    </Form>
  )
}



export default Newsletter
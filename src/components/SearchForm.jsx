import React from 'react'
import { Form, useNavigation } from 'react-router-dom'
import styled from 'styled-components'

const SearchForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  return (
   <Wrapper>
    <Form className='form'>
       <input type="search" name="search" className='form-input' />
       <button type="submit" className='btn' disabled={isSubmitting}>{isSubmitting ? 'searching...' : 'search'}</button>
    </Form>
   </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 6rem;
  .form {
    display: grid;
    grid-template-columns: 1fr auto;
   }
   .form-input {
     border-top-right-radius: 0;
     border-bottom-right-radius: 0;
   }
   .btn {
    border-top-left-radius: 0;
     border-bottom-left-radius: 0;
   }
`

export default SearchForm
import React from 'react'


import './NewPlace.css'
import Input from '../../shared/components/Input'
import {VALIDATOR_REQUIRE} from '../../shared/utils/validators'

export default function NewPlace() {
  return (
    <form className='place-form'>
      <Input element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title." />
    </form>
  )
}


import { useState, useCallback, FormEvent, ChangeEvent } from 'react';

export const UseFormEasy = (initValues: any, onSubmit: () => Promise<void>) => {
    const [formValues, setFormValues] = useState(initValues);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputsChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }, [formValues])

    const handleSubmission = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true)
        await onSubmit()
        setIsSubmitting(false)
    }, [onSubmit])

    return [formValues, handleInputsChange, handleSubmission, isSubmitting]
}
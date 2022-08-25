
import { useState, useCallback, FormEvent, ChangeEvent } from 'react';





export const UseFormSimple = (initialValues: any) => {
    const [formValues, setFormValues] = useState(initialValues)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [Errors, setErrors] = useState<string>()

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }, [formValues])

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>, url: string) => {
        e.preventDefault();
        setIsSubmitting(true)
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        })
        console.log('res :::>>>', res.body)
        setIsSubmitting(false)
    }, [formValues])

    return ([formValues, handleChange, handleSubmit, isSubmitting])
}






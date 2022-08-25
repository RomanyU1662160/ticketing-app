
import { useState, useCallback, FormEvent, ChangeEvent } from 'react';

export const UseFormSimpler = (initValues: any, onSubmit: () => Promise<void>) => {
    const [formValues, setFormValues] = useState(initValues);

    const handleFormChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }, [formValues])

    const handleSubmission = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit()
    }, [onSubmit])

    return [formValues, handleFormChange, handleSubmission]
}
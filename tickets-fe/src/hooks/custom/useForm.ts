// https://dev.to/karan316/build-forms-using-react-the-easy-way-with-typescript-46bh

import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export const useForm = (initialValues: any, validationSchema: any) => {
    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState<any>();
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
            setTouched({ ...touched, [e.target.name]: true });
        },
        [formValues, touched]
    );

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>, url: string) => {
            e.preventDefault();
            setIsSubmitting(true);
            setErrors([])

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })

            const data = await res.json();

            console.log("data:::>>>", data)
            if (data.errors) {
                setErrors(data.errors)
            }
            setIsSubmitting(false);

        },
        [formValues]
    );

    return ({
        formValues,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleSubmit
    })

}

export const useFormWithLocalStorage = (initialValues: any, validationSchema: any, key: string) => {
    const [formValues, setFormValues] = useState(() => {
        const localStorageJson = localStorage.getItem(key)
        return localStorageJson ? JSON.parse(localStorageJson) : initialValues
    }
    )
    const [errors, setErrors] = useState<string[]>([]);
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
            setTouched({ ...touched, [e.target.name]: true });
        },
        [formValues, touched]
    );

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>, url: string) => {
            e.preventDefault();
            setIsSubmitting(true);
            setErrors([])
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })

            const data = await res.json();
            console.log("data:::>>>", data)
            if (res.status === 401) {
                setErrors([...errors, data.authError[0]]);
            }
            if (res.status === 505) {
                console.log("data.details:::>>>", data.details)
                setErrors([...errors, data.details]);
            }
            setIsSubmitting(false);

        },
        [formValues, errors]
    );

    return ({
        formValues,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleSubmit
    })

}
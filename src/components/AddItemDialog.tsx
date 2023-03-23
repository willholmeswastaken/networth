import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { type DialogProps } from '~/types/DialogProps'
import useDialogStore from '~/stores/dialogStore'
import { z, ZodError } from 'zod'
import { Prisma } from '@prisma/client'

interface FormData {
    name: string;
    value: number;
}

const validationSchema = z.object({
    name: z.string().nonempty('Required'),
    value: z.number().nonnegative('Must be a number'),
});


export const AddItemDialog = ({ onSubmit }: DialogProps) => {
    const isOpen = useDialogStore((state) => state.dialogs['add-item'] || false);
    const closeDialog = useDialogStore((state) => state.closeDialog);
    const cancelButtonRef = useRef(null)
    const onCloseDialog = () => {
        closeDialog('add-item');
    };
    const handleSubmit = (values: FormData) => {
        console.log('Form data:', values);
        onCloseDialog();
    };
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onCloseDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start w-full">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Deactivate account
                                            </Dialog.Title>
                                            <Formik
                                                initialValues={{ name: '', value: 0 }}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit}
                                                validate={(values) => {
                                                    try {
                                                        validationSchema.parse(values);
                                                    } catch (error: unknown) {
                                                        if (error instanceof ZodError) {
                                                            return error.formErrors.fieldErrors;
                                                        }
                                                    }
                                                }}
                                            >
                                                <Form className="p-6 space-y-4 w-full">
                                                    <div>
                                                        <label htmlFor="name" className="block mb-1">
                                                            Name
                                                        </label>
                                                        <Field
                                                            id="name"
                                                            name="name"
                                                            type="text"
                                                            className="w-full border border-gray-300 rounded p-2"
                                                        />
                                                        <ErrorMessage
                                                            name="name"
                                                            component="div"
                                                            className="text-red-600"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="value" className="block mb-1">
                                                            Value
                                                        </label>
                                                        <Field
                                                            id="value"
                                                            name="value"
                                                            type="number"
                                                            step="any"
                                                            className="w-full border border-gray-300 rounded p-2"
                                                        />
                                                        <ErrorMessage
                                                            name="value"
                                                            component="div"
                                                            className="text-red-600"
                                                        />
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                        onClick={onCloseDialog}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={onCloseDialog}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

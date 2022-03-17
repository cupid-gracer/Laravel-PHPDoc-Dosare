// Validation Rules
validator = FormValidation.formValidation(
    document.getElementById('step3_form'), {
        fields: {
            dosar_an: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    },

                }
            },
            dosar_nr: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            data_recipisa: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            data_eliberare: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            suma_consmnata: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            creditor: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            recipisa_nr: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            debitor: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            suma_creditor: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            op_nr_creditor: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            suma_cheltuieli: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            op_nr_cheltuieli: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            nr_ff: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            data_incetare: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            }

        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            submitButton: new FormValidation.plugins.SubmitButton(),
            // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            bootstrap: new FormValidation.plugins.Bootstrap({
                eleInvalidClass: '',
                eleValidClass: '',
            })
        }
    }
);
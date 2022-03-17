// Validation Rules
validator = FormValidation.formValidation(
    document.getElementById('step1_form'), {
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
            data_deschidere: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            instanta: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            adresa_instanta: {
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
            adresa_creditor: {
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
            adresa_debitor: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            cui: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            titlul_executoriu: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            inscrisuri: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            format_tilu_executoriu: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            taxa_timbru: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            format_titlu_executoriu: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },


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
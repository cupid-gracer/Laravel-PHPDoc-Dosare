// Validation Rules
validator = FormValidation.formValidation(
    document.getElementById('step2_form'), {
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
            data_poprire: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            data_incuviintare: {
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
            onorariu: {
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
            // total_penalitati: {
            //     validators: {
            //         notEmpty: {
            //             message: '*This field is required'
            //         }
            //     }
            // },
            // debit_plus_penalitati: {
            //     validators: {
            //         notEmpty: {
            //             message: '*This field is required'
            //         }
            //     }
            // },
            total_cheltuieli: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            total_somatie: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            debit_plus_penalitati: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            adresa_banca: {
                validators: {
                    notEmpty: {
                        message: '*This field is required'
                    }
                }
            },
            banca: {
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
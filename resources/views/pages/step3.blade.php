@extends('layouts.app')

@section('content')
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <!--begin::Subheader-->
        <div class="subheader py-2 py-lg-12 subheader-transparent" id="kt_subheader">
            <div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                <!--begin::Info-->
                <div class="d-flex align-items-center flex-wrap mr-1">
                    <!--begin::Heading-->
                    <div class="d-flex flex-column">
                        <!--begin::Title-->
                        <h2 class="text-white font-weight-bold my-2 mr-5">{{ Session::get('pagetitle') }}</h2>
                        <!--end::Title-->
                    </div>
                    <!--end::Heading-->
                </div>
                <!--end::Info-->
            </div>
        </div>
        <!--end::Subheader-->
        <!--begin::Entry-->
        <div class="d-flex flex-column-fluid">
            <!--begin::Container-->
            <div class="container">
                <!--begin::Dashboard-->
                <!--begin::Row-->
                <div class="row">
                    <div class="col-xl-12">
                        <!--begin::Tiles Widget 1-->
                        <div class="card card-custom gutter-b card-stretch">
                            <!--begin::Header-->
                            <div class="card-header border-0 pt-5">
                                <div class="card-title">
                                    <div class="card-label">
                                        <div class="font-weight-bolder">Please Fill Form </div>
                                    </div>
                                </div>
                            </div>
                            <!--end::Header-->
                            <!--begin::Body-->
                            <div class="card-body d-flex flex-column px-0">
                                <form id="step3_form" class="form" action="/eliberare" method="POST">
                                    @csrf
                                    <div class="form-group">
                                        <div class="alert alert-light-primary d-none mb-15" role="alert" id="kt_form_msg">
                                            <div class="alert-icon">
                                                <i class="la la-warning"></i>
                                            </div>
                                            <div class="alert-text font-weight-bold">
                                                Oh snap! Change a few things up and try submitting again.
                                            </div>
                                            <div class="alert-close">
                                                <button type="button" class="close" data-dismiss="alert"
                                                    aria-label="Close">
                                                    <span><i class="ki ki-close "></i></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group row" id="test">
                                            <div class="col-lg-3">
                                                <label>Dosar nr.:</label>
                                                <input type="number" id="dosar_nr" class="form-control" name="dosar_nr"
                                                    placeholder="Enter Dosar nr" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>Dosar an:</label>
                                                <div class="typeahead">
                                                    <input class="form-control" id="dosar_an" type="number"
                                                        name="dosar_an" placeholder="Enter Dosar an" />
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <label>Fetch Data:</label>
                                                <a id="btn-fetch" class="form-control btn btn-primary"><i class="fa fa-sync"></i>
                                                <span style="margin-left:10px">Sync</span></a>

                                            </div>
                                            <div class="col-lg-2 download" style="display: none">
                                                <label>Download :</label>
                                                <a id="btn-download" class="form-control btn btn-success">
                                                    <i class="fa fa-download"></i>
                                                    Download</a>
                                            </div>
                                        </div>
                                        <div class="separator separator-dash my-10"></div>
                                        <div class="form-group row">
                                            <div class="col-lg-3">
                                                <label>DATA ELIBERARE:</label>
                                                <input type="text" class="form-control" name="data_eliberare"
                                                    placeholder="Enter DATA ELIBERARE" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>DATA RECIPISA:</label>
                                                <input type="text" class="form-control" name="data_recipisa"
                                                    placeholder="Enter DATA RECIPISA" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>SUMA:</label>
                                                <input type="text" class="form-control" name="suma_consmnata"
                                                    placeholder="Enter SUMA" />
                                            </div>
                                            <div class="col-lg-3">
                                                <label>RECIPISA NR:</label>
                                                <input type="text" class="form-control" name="recipisa_nr"
                                                    placeholder="Enter RECIPISA NR" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-6">
                                                <label>CREDITOR:</label>
                                                <input type="text" class="form-control" name="creditor"
                                                    placeholder="Enter CREDITOR" readonly />
                                            </div>
                                            <div class="col-lg-2">
                                                <label>SUMA C.:</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" name="suma_creditor"
                                                        placeholder="Enter SUMA CREDITOR" readonly />
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <label>OP C.:</label>
                                                <div class="input-group">
                                                    <input type="number" class="form-control" name="op_nr_creditor"
                                                        placeholder="Enter OP C" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-6">
                                                <label>DEBITOR:</label>
                                                <input type="text" class="form-control" name="debitor"
                                                    placeholder="Enter DEBITOR" readonly />
                                            </div>
                                            <div class="col-lg-2">
                                                <label>SUMA CH.:</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" name="suma_cheltuieli"
                                                        placeholder="Enter SUMA CHELTUIELI" readonly />
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <label>OP CH:</label>
                                                <div class="input-group">
                                                    <input type="number" class="form-control" name="op_nr_cheltuieli"
                                                        placeholder="Enter OP CH" />
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <label>F.F.:</label>
                                                <div class="input-group">
                                                    <input type="number" class="form-control" name="nr_ff"
                                                        placeholder="Enter F.F" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-lg-3">
                                                <label>DATA INCETARE:</label>
                                                <input type="text" class="form-control" name="data_incetare"
                                                    placeholder="Enter DATA INCETARE" />
                                            </div>
                                        </div>
                                        <div class="separator separator-dashed my-10"></div>
                                    </div>
                                    <div class="card-footer">
                                        <div class="row">
                                            <div class="col-lg-3"></div>
                                            <button id="btn-submit" type="submit" class="btn btn-primary mr-2 col-lg-3  mt-3">
                                                <i class="fa fa-save"></i>
                                                SAVE</button>
                                            <button type="reset"
                                                class="btn btn-secondary mr-2  col-lg-3 mt-3">
                                                <i class="far fa-times-circle"></i>
                                                CANCEL</button>
                                            <div class="col-lg-3"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!--end::Body-->
                        </div>
                        <!--end::Tiles Widget 1-->
                    </div>
                </div>
                <!--end::Row-->
                <!--end::Dashboard-->
            </div>
            <!--end::Container-->
        </div>
        <!--end::Entry-->
    </div>
@endsection

@section('myJS')
    <script src="assets/js/my/step3_form_validate.js"></script>
    <script src="assets/js/my/step3.js"></script>
@endsection

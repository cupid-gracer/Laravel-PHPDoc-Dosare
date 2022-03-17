

<?php $__env->startSection('content'); ?>
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <!--begin::Subheader-->
        <div class="subheader py-2 py-lg-12 subheader-transparent" id="kt_subheader">
            <div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                <!--begin::Info-->
                <div class="d-flex align-items-center flex-wrap mr-1">
                    <!--begin::Heading-->
                    <div class="d-flex flex-column">
                        <!--begin::Title-->
                        <h2 class="text-white font-weight-bold my-2 mr-5"><?php echo e(Session::get('pagetitle')); ?></h2>
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
                                                <input class="form-control" id="dosar_an" type="number" name="dosar_an"
                                                    placeholder="Enter Dosar an" />
                                            </div>
                                        </div>
                                        <div class="col-lg-2">
                                            <label>Fetch Data:</label>
                                            <a id="btn-fetch" class="form-control btn btn-primary"><i class="fa fa-sync"></i>
                                                <span style="margin-left:10px">Sync</span></a>
                                        </div>
                                        <div class="col-lg-4"></div>
                                    </div>
                                    <div class="separator separator-dash my-10"></div>
                                    <div class="form-group row copy-text" style="display: none">
                                        <div class="col-lg-12">
                                            <label>Clipboard:</label>
                                            <textarea class="form-control" id="kt_clipboard" rows="15"></textarea>
                                            <div class="mt-4"></div>
                                            <a class="btn btn-primary col-md-3 col-sm-12" data-clipboard="true"
                                                data-clipboard-target="#kt_clipboard"><i class="la la-clipboard"></i> Copy
                                                to clipboard</a>
                                        </div>
                                    </div>
                                </div>
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
<?php $__env->stopSection(); ?>

<?php $__env->startSection('myJS'); ?>
    <script src="assets/js/my/step4.js"></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH E:\02_web\03_laravel\php docx\dosare\resources\views/pages/step4.blade.php ENDPATH**/ ?>
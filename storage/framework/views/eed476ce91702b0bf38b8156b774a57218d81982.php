<div id="kt_header" class="header header-fixed">
    <!--begin::Container-->
    <div class="container d-flex align-items-stretch justify-content-between">
        <!--begin::Left-->
        <div class="d-flex align-items-stretch mr-3">
            <!--begin::Header Logo-->
            <div class="header-logo">
                <a href="/">
                    <img alt="Logo" src="assets/media/logos/logo.png" class="logo-default max-h-40px" />
                    <img alt="Logo" src="assets/media/logos/logo.png" class="logo-sticky max-h-40px" />
                </a>
                
            </div>
            <!--end::Header Logo-->
            <!--begin::Header Menu Wrapper-->
            <?php if(Auth::user()): ?>

            <div class="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
                <!--begin::Header Menu-->
                <div id="kt_header_menu" class="header-menu header-menu-left header-menu-mobile header-menu-layout-default">
                    <!--begin::Header Nav-->
                    <ul class="menu-nav">
                        <?php $pagename = Session::get('pagename'); $select = 'menu-item-here';
                        ?>
                        <li class="menu-item menu-item-rel <?php echo e($pagename == 'step1'? $select:''); ?>"  aria-haspopup="true">
                            <a href="/dosar_nou" class="menu-link">
                                <span class="menu-text">Dosar nou</span>
                                <i class="menu-arrow"></i>
                            </a>
                        </li>
                        <li class="menu-item menu-item-rel  <?php echo e($pagename == 'step2'? $select:''); ?>" data-menu-toggle="click" aria-haspopup="true">
                            <a href="/poprire" class="menu-link">
                                <span class="menu-text">Poprire</span>
                                <span class="menu-desc"></span>
                                <i class="menu-arrow"></i>
                            </a>
                        </li>
                        <li class="menu-item menu-item-rel <?php echo e($pagename == 'step3'? $select:''); ?>" data-menu-toggle="click" aria-haspopup="true">
                            <a href="/eliberare" class="menu-link">
                                <span class="menu-text">Eliberare</span>
                                <span class="menu-desc"></span>
                                <i class="menu-arrow"></i>
                            </a>
                        </li>
                        <li class="menu-item menu-item-rel <?php echo e($pagename == 'step4'? $select:''); ?>" data-menu-toggle="click" aria-haspopup="true">
                            <a href="/virare" class="menu-link">
                                <span class="menu-text">Virare</span>
                                <span class="menu-desc"></span>
                                <i class="menu-arrow"></i>
                            </a>
                        </li>
                    </ul>
                    <!--end::Header Nav-->
                </div>
                <!--end::Header Menu-->
            </div>

            <?php endif; ?>
            <!--end::Header Menu Wrapper-->
        </div>
        <!--end::Left-->
        <!--begin::Topbar-->
        <?php if(Auth::user()): ?>

        <div class="topbar">
            <!--begin::User-->
            <div class="dropdown">
                <!--begin::Toggle-->
                <div class="topbar-item">
                    <div class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto" id="kt_quick_user_toggle">
                        <span class="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                        <span class="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4"><?php echo e(Auth::user()?Auth::user()->name:''); ?></span>
                        <span class="symbol symbol-35">
                            <span class="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30"><?php echo e(ucfirst(substr(Auth::user()->name, 0,1))); ?></span>
                        </span>
                    </div>
                    <div class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto" id="kt_quick_user_toggle">
                        <a href="/logout">
                            <span class="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">Sign out</span>
                            <i class="fa fa-fas fa-sign-out-alt icon-md"></i>
                        </a>
                        
                    </div>
                </div>
                <!--end::Toggle-->
            </div>
            <!--end::User-->
        </div>

        <?php endif; ?>
        <!--end::Topbar-->
    </div>
    <!--end::Container-->
</div><?php /**PATH E:\02_web\03_laravel\php docx\dosare\resources\views/layouts/widgets/header.blade.php ENDPATH**/ ?>
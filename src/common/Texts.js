let  l1='لدي استفسار بخصوص : '
let  l2='  مدينة :'
let      l3=' حي : '
let the_prices= 'الأسعار';
let  l4=' أيام العمل : '
let  l5=' الخميس : '
let  l6=' الجمعة : '
let  l7=' السبت : '
let  l9=' ارغب في حجزها يوم : '
export const TEXTS = {
    /*  Login Screen */

    phone: 'رقم الجوال',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    register: 'تسجيل',
    fisrtname: 'الاسم الاول',
    lastname: 'الاسم الاخير',
    forgetPassword: ' نسيت كلمة المرور؟',
    getPassword: 'استعادة',
    visitor: 'الدخول كزائر',
    has_not_acc: 'ليس لديك حساب؟',
    register_now: 'تسجيل جديد',

    /*  OnBoard Screen */
    onboard1: 'ابحث عن الاستراحة الأنسب لك',
    onboard2: 'تواصل مع المؤجر بشكل مباشر',
    onboard3: 'قيم تجربتك و أخبرنا عن رأيك',
    next: 'التالي',
    done: 'دخول الآن',


    /* CheckPhone Screen */
    enter_phone: 'ادخل رقم الجوال',
    confirm: 'تأكيد',

    /* OTP Screen */
    otp_text: ' ادخال رمز التاكيد ',
    otp_code: ' رمز التاكيد ',
    otp_confirm: 'تاكيد ودخول',

    /* Register Screen */
    new_register: 'تسجيل عضوية جديدة',
    name: 'الاسم',
    email: 'البريد الالكتروني',
    has_acc: 'لديك حساب بالفعل؟',
    register_text: 'عند الضغط علي \'تسجيل\', فانك توافق علي الشروط والاحكام الخاصه بالتطبيق',

    /** Tabs */

    discover: 'استكشف',
    search: 'البحث',
    favorite: 'المفضلة',
    my_profile: 'الملف الشخصي'


    /**
     * ERRORS
     */
    ,
    empty_phone: 'ادخل رقم الجوال',
    empty_password: 'ادخل كلمةالمرور',
    empty_otp: 'ادخل رمز التاكيد',
    empty_name: 'ادخل الاسم',
    empty_email: 'ادخل البريد الالكتروني',
    invalid_password: 'كلمة المرور يجب أن تكون علي الاقل 6 حروف أو أرقام ',
    invalid_email: 'البريد الالكتروني غير صالح',
    invalid_phone: 'رقم الجوال غير صالح',
    login_error: 'يرجي التاكد من رقم الجوال وكلمة المرور',
    exist_number: 'هذا الرقم موجود بالفعل',
    code_error: 'الرمز التاكيدي غير صحيح',
    error: 'حدث خطأ ، حاول مرة أخري',

    /* get Password Screen */
    get_password: 'استعادة كلمة المرور',

    /* enter secret code Screen */
    enter_secret_code: 'ادخل الرقم السري',
    enter_password_text: 'فضلا مراجعة البريد الالكتروني المسجل لدينا لاستعادة كلمة المرور '
    ,
    /* Change Password Screen */
    new_password: 'كلمة المرور الجديدة',
    repeat_password: 'إعادة كلمة المرور',
    set_password: 'تغيير كلمة مرور',
    save_password: 'حفظ',

    /** Side Menu */
    add_estraha: 'اضافة استراحة',
    offers: 'العروض',
    notifications: 'التنبيهات',
    invite_friends: 'دعوة الأصدقاء',
    help: 'المساعدة',
    settings: 'الإعدادات',
    hello: 'مرحبا',
    visit_profile: 'مشاهدة الملف الشخصي',
    logout: 'تسجيل الخروج',


    /** Place */
    code: 'الرقم',
    start_from: 'تبدأ من',
    currency: 'ر.س',
    delete: 'حذف',
    /*Profile */
    save: 'حفظ',
    city: 'المدينة',

    /* Search */
    search_Text: 'ادخل اسم الإستراحة او رقمها',
    advanced_search: 'بحث متقدم',

    //Gender
    gender: 'النوع',
    male: 'ذكر',
    female: 'انثي',

    email_not_exist: 'البريد الالكتروني غير مسجل',


    //Filter Results
    filter_results: 'تصفية النتائج',
    survey: 'مسح',
    near_curr_loacation: 'بالقرب من الموقع الحالي ',
    direction: 'الاتجاة',
    breack_type: 'نوع الاستراحة',
    property_type: 'نوع الملكية',
    price: 'السعر',
    price_range_msg: (val) => `بداية من ${val[0]} ريال إلى ${val[1]} ريال`,
    additional_option: 'خيارات إضافية',
    filter_results_with_params: (val) => ` تصفية النتائج (${val})`,

    //Direction
    north: 'الشمال',
    south: 'جنوب',
    east: 'الشرق',
    west: 'غرب',

    //Break Type
    // استراحة
// ملعب
// مناسبات
// شاليه
    //مخيم

    a_break: 'استراحة',
    chalet_for_sale: 'شاليه',
    camp: 'مخيم',
    stadium: 'ملعب',
    occasions: 'مناسبات',

    //Additional Options
    swimmingpool: 'المسبح',
    football_court: 'ملعب كرة',
    two_parts: 'قسمين',

    //TODO Sorting items
    most_recent: 'الأحدث',
    highest_first: 'السعر: الأعلى سعرًا',
    lowest_first: 'السعر: الأقل سعرًا',
    distance: 'المسافة: الأقرب',
    top_reated: 'الأعلى تقييمًا',
    least_rated: 'الأقل تقييمًا',
    sort_results:'فرز النتائج',

    fabulous:'رائع',
    exellent:'ممتاز',
    good:'جيد',
    comments:' التعليقات',

    //TODO ADD PROPERTY
    add_property: 'إضافة استراحة',
    basic_info: 'معلومات أساسية',
    // additional_option: 'خيارات إضافية' ,
    photos_and_videos: 'الصور والفيديو',

    break_name: 'اسم الإستراحة',
    name_placeholder:'مثال، استراحة الورود',
    type_of_break: 'نوع الإستراحة',
    //city:'المدينة',
    //direction: 'الاتجاة',
    title: 'العنوان',
    add_placeholder_text:'الشارع، الحي، بالقرب من …',
    describe_break: 'وصف الاستراحة',
    save_and_next: 'حفظ والتالي ..',
    save_the_break:'حفظ الإستراحة',

    // swimmingpool: 'المسبح',
    // football_court: 'ملعب كرة',
    // two_parts: 'قسمين',

    space: 'المساحة',
    placeholder_space:'مثال: 500 م',
    entry_time:'توقيت الدخول',
    exit_time:'توقيت الخروج',

    dicount_percentage: 'نسبة الخصم',
    is_there_show: 'هل هناك عرض؟',
    end_of_the_show: 'نهاية العرض',
    start_of_the_show: 'بداية العرض',


    all_day_of_week:'سعر يوم الأسبوع',
    thursday_price:'سعر الخميس',
    friday_price:'سعر الجمعة',
    saturday_price:'سعر السبت',

    add_photos: '+ أضف صور',
    you_can_add_upto_20_photos: 'يمكنكم إضافة حتى 20 صور',
    do_you_have_video_link: 'هل لديك رابط فيديو؟',
    youtube_link:'رابط يوتيوب',
    preview : 'معاينة',
    save_the_SDK: 'حفظ الإستراحة',



    //TODO VIEW PROPERTY
    all_photos: 'كل الصور',
    number: 'الرقم:',
    riyal:'ريال',
    day: '/ اليوم',
    rating: 'تقييم',
    // start_from: 'يبدأ من:',
    details: 'تفاصيل',
    specifications: 'المواصفات',
    //space
    //swimmingpool
    place_on_the_map: 'المكان على الخريطة',
    map_alert:'الموقع على خريطة قد لايكون دقيقا بعض الأحيان,\nالرجاء الاتصال على ارقام الاستراحه للتأكد من الموقع',
    rate_your_exp: 'قيم تجربتك',
    btn_rate_your_exp : 'أخبرنا عن تجربتك',
    customer_feedback: 'آراء العملاء',
    find_out_all_prices: 'معرفة كل الأسعار',
    contact_the_advertieser: 'تواصل مع المعلن',

    yes:'نعم',
    no:'لا',
    m:'م',
    ok:'حسنا',
    //TODO Weekdays
    saturday:"السبت",
    sunday:"الأحد",
    monday:"الأثنين",
    tuesday:"الثلاثاء",
    wednesday:"الأربعاء",
    thurday:"الخميس",
    friday:"الجمعة",

    booking_policy:'شروط الحجز وسياسة الالغاء',
    all_prices: 'كل الأسعار',
    tell_us_your_exp:'أخبرنا عن تجربتك',
    add_comment:'أضف تعليق',
    add_photo_your_stey_there: 'إضافة صور من إقامتك هناك',
    addition:'إضافة',
    checkout_time:'وقت الدخول',
    check_in_time:'وقت الخروج',

    choose_a_category:'اختار الفئة',
    enter_name_of_property:'أدخل اسم العقار',
    choose_a_city:'الرجاء اختيار المدينة',
    choose_the_name_of_region:'اختار اسم المنطقة',
    enter_the_address:'اختار اسم المنطقة',
    enter_the_area:'دخول المنطقة',
    enter_the_description:'دخول المنطقة',
    enter_weekday_price:'أدخل سعر يوم الأسبوع',
    enter_thursday_price:'أدخل سعر الخميس',
    enter_friday_price:'أدخل سعر الجمعة',
    enter_saturday_price:'أدخل سعر السبت',
    



    get_whatsapp_message:(p1,p2,p3,p4,p5,p6,p7,p8,p9)=>`${l1}${p1}\n${l2}${p2}\n${l3}${p3}\n${the_prices}\n${l4}${p4}\n${l5}${p5}\n${l6}${p6}\n${l7}${p7}\n\n${p8}\n\n${l9}${p9}`,
    booking_policy_content:'\nشروط الحجز\n' +
        'لتأكيد الحجز يتم تحويل نصف المبلغ.\n' +
        'يوجد تأمين بمبلغ 500 يدفع عند الوصول ويسترجع في حال تم التأكد من سلامة ممتلكات.\n' +
        '\n' +
        'سياسة الإلغاء و الإسترجاع:\n' +
        'في حال إلغاء الحجز ، لا يمكن استرجاع العربون\n',



};

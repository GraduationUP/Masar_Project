export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-10">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">مسار</h2>
                        <p className="text-sm">ربطك مع البائعين المحليين والخدمات الأساسية في حيك.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 mb-3">المنصة</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition duration-300">خريطة الخدمات</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">السوق</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">الخدمات</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">المتاجر</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 mb-3">الموارد</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition duration-300">مركز المساعدة</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">دليل البائع</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">المدونة</a></li>
                            <li><a href="#" className="hover:text-white transition duration-300">التعليمات</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-white font-semibold mb-3">ابقَ على إطلاع</p>
                        <p className="text-sm mb-3">اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات والعروض.</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-sm flex justify-between aling-center">
                    <div>
                        <p className="mb-3">غزة، فلسطين</p>
                        <p className="mb-3">contact@masar.com</p>
                        <p className="mb-3">00970123456789</p>
                        <p className="mb-4">© {new Date().getFullYear()} مسار. جميع الحقوق محفوظة.</p>
                    </div>
                    <div className="flex gap-4 space-x-6 mt-2">
                        <a href="#" className="hover:text-white transition duration-300">الخصوصية</a>
                        <a href="#" className="hover:text-white transition duration-300">الشروط</a>
                        <a href="#" className="hover:text-white transition duration-300">ملفات تعريف الارتباط</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
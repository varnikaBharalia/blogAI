export default function About() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-16">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:w-5/12 lg:w-5/12">
                        <img
                            src="https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-600nw-1029506242.jpg"
                            alt="image"
                            className="rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        />
                    </div>
                    <div className="md:w-7/12 lg:w-6/12 bg-blue-50 rounded-xl p-6 transition-colors duration-300 hover:bg-blue-100">
                        <h1 className="mb-4 text-lg font-semibold text-blue-600">
                            A blog website is an online platform where individuals or
                            organizations share thoughts, information, experiences, or news on
                            various topics. It allows users to publish articles, known as blog
                            posts, which can include text, images, videos, and links. Blogs
                            often focus on specific niches like technology, lifestyle, travel,
                            or education, and are updated regularly to engage readers.
                            Visitors can interact through comments, likes, or shares, creating
                            a community around the content. Blog websites are valuable tools
                            for personal expression, professional branding, and digital
                            marketing. With simple tools and platforms available, anyone can
                            start and maintain a blog with ease.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

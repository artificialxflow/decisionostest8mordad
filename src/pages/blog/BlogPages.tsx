import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader, Badge } from '../../components/ui';
import { ROUTES } from '../../routes';
import posts from '../../content/blog-posts.json';

export const BlogListPage: React.FC = () => {
  useEffect(() => {
    document.title = 'بلاگ DecisionOS — مقالات حقوقی و کسب‌وکار';
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <PageHeader
        title="بلاگ DecisionOS"
        description="محتوای آموزشی برای SEO — حقوق، املاک، AI و سازمان"
        badge={<Badge tone="blue">SEO Content</Badge>}
      />
      <div className="space-y-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="block p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge>{p.tag}</Badge>
              <span className="text-[10px] text-slate-400">{p.date}</span>
            </div>
            <h2 className="text-sm font-bold">{p.title}</h2>
            <p className="text-[11px] text-slate-500 mt-1">{p.excerpt}</p>
          </Link>
        ))}
      </div>
      <Link to={ROUTES.home} className="text-xs text-blue-600 font-bold">← بازگشت به صفحه اصلی</Link>
    </div>
  );
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | DecisionOS`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', post.metaDescription);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-sm font-bold">مقاله یافت نشد</p>
        <Link to={ROUTES.blog} className="text-blue-600 text-xs mt-2 inline-block">بازگشت به بلاگ</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <Badge>{post.tag}</Badge>
      <h1 className="text-2xl font-black">{post.title}</h1>
      <p className="text-[10px] text-slate-400">{post.date}</p>
      <div className="prose prose-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm">
        {post.body}
      </div>
      <Link to={ROUTES.blog} className="text-xs text-blue-600 font-bold inline-block pt-4">← همه مقالات</Link>
    </article>
  );
};

import Layout from "@components/Layout";

export default function PageTemplate({ pageDetails }) {
  return (
    <Layout>
      <div className="py-8 p-4 max-w-screen-md mx-auto">
        <div
          className="prose  sm:prose-lg prose-red page-content max-w-none"
          dangerouslySetInnerHTML={{
            __html: pageDetails?.content ?? `<p>No content found</p>`,
          }}
        />
      </div>
    </Layout>
  );
}

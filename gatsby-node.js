const path = require(`path`);
const queryAll = require(`./gatsby/queryAll.js`);

exports.onCreateNode = ({ node }) => {
  console.log(`onCreateNode:`, node.internal.type);
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const artistDetailPageTemplate = path.resolve(
      `./src/templates/artist-detail.js`
    );
    const recordDetailPageTemplate = path.resolve(
      `./src/templates/record-detail.js`
    );
    const reviewDetailPageTemplate = path.resolve(
      `./src/templates/review-detail.js`
    );

    resolve(
      graphql(queryAll).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const artists = result.data.allArtist.edges;
        artists.forEach(node => {
          const path = `artists/` + node.artist.slug;
          createPage({
            path,
            component: artistDetailPageTemplate,
            context: {
              slug: node.artist.slug
            }
          });
        });

        const records = result.data.allRecord.edges;
        records.forEach(node => {
          const path = `records/` + node.record.slug;
          createPage({
            path,
            component: recordDetailPageTemplate,
            context: {
              slug: node.record.slug
            }
          });
        });

        const reviews = result.data.allReview.edges;
        reviews.forEach(node => {
          const path = `reviews/` + node.review.slug;
          createPage({
            path,
            component: reviewDetailPageTemplate,
            context: {
              slug: node.review.slug
            }
          });
        });
      })
    );
  });
};

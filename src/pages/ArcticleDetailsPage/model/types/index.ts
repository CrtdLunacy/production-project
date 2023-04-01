import { ArticleDetailsCommentSchema, ArticleDetailsRecommendationsSchema } from 'pages/ArcticleDetailsPage';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema,
    recommendations: ArticleDetailsRecommendationsSchema
}

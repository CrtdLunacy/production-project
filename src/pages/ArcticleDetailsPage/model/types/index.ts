// eslint-disable-next-line lunacy-plugin/path-cheker
import { ArticleDetailsCommentSchema, ArticleDetailsRecommendationsSchema } from '@/pages/ArcticleDetailsPage';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema,
    recommendations: ArticleDetailsRecommendationsSchema
}

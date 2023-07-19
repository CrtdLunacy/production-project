import { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentSchema';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema,
    recommendations: ArticleDetailsRecommendationsSchema
}

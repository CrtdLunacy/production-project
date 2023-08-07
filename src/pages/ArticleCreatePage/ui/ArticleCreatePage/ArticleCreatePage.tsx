import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ArticleCreatePage.module.scss';
import { PageLayout } from '@/widgets/PageLayout';
import { ReducersList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { createPageReducer } from '../../model/slice/createPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { ArticleThemes, ArticleType } from '@/entities/Article';

interface ArticleCreatePageProps {
    className?: string;
}

const initialReducers: ReducersList = {
    articleCreatePage: createPageReducer,
};

// export interface Article {
//     id: string;
//     title: string;
//     user: User;
//     subtitle: string;
//     img: string;
//     views: number;
//     createdAt: string;
//     type: ArticleType[];
//     blocks: ArticleBlock[];
// }

export const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [articleType, setArticleType] = useState<ArticleType>(ArticleType.IT);
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const dispatch = useAppDispatch();

    // const handleCreateArticle = useCallback((value?: Article) => {
    //     dispatch(createPageActions.createArticle();
    // }, [dispatch]);

    const handleChangeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const handleChangeSubtitle = useCallback((value: string) => {
        setSubtitle(value);
    }, []);

    const handleChangeUrlImg = useCallback((value: string) => {
        setUrlImg(value);
    }, []);

    const handleChangeArticleType = useCallback((articleType: ArticleType) => {
        setArticleType(articleType);
    }, []);

    return (
        <PageLayout className={classNames(styles.ArticleCreatePage, {}, [className])}>
            <VStack gap="10">
                <Text title={t('Конструктор статьи')} />
                <VStack gap="10">
                    <Input
                        placeholder={t('Название статьи')}
                        onChange={handleChangeTitle}
                        value={title}
                    />
                    <Input
                        placeholder={t('Короткое описание статьи')}
                        onChange={handleChangeSubtitle}
                        value={subtitle}
                    />
                    <Input
                        placeholder={t('Ссылка на картинку к статье')}
                        onChange={handleChangeUrlImg}
                        value={urlImg}
                    />
                    <ArticleThemes
                        value={t(articleType)}
                        onChange={handleChangeArticleType}
                    />
                </VStack>
            </VStack>
        </PageLayout>
    );
});

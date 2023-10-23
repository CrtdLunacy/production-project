import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ArticleCreatePage.module.scss';
import { PageLayout } from '@/widgets/PageLayout';
import { ReducersList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { createPageActions, createPageReducer } from '../../model/slice/createPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import {
    ArticleBlockType, ArticleThemes, ArticleType,
    ArticleCodeBlockComponent, ArticleImageBlockComponent, ArticleTextBlockComponent, ArticleBlock,
} from '@/entities/Article';

import {
    getNewArticleBlocks,
    getNewArticleError, getNewArticleIsLoading, getNewArticleSelectedType, getNewArticleTitle, getNewArticleType,
} from '../../model/selectors/createArticleSelectors';
import { SkeletonLoader } from '@/shared/ui/SkeletonLoader';
import { Button } from '@/shared/ui/Button';

interface ArticleCreatePageProps {
    className?: string;
}

const initialReducers: ReducersList = {
    articleCreatePage: createPageReducer,
};

const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent className={styles.block} block={block} key={block.id} />;
    case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent className={styles.block} block={block} key={block.id} />;
    case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent className={styles.block} block={block} key={block.id} />;
    default:
        return null;
    }
};

export const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const title = useSelector(getNewArticleTitle);
    const [subtitle, setSubtitle] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const articleType = useSelector(getNewArticleType);
    const articleSelectedType = useSelector(getNewArticleSelectedType);
    const articleTypes = useSelector(getNewArticleType);
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getNewArticleIsLoading);
    const error = useSelector(getNewArticleError);
    const blocks = useSelector(getNewArticleBlocks);

    const handleChangeTitle = useCallback((value: string) => {
        dispatch(createPageActions.setTitle(value));
    }, [dispatch]);

    const handleChangeSubtitle = useCallback((value: string) => {
        dispatch(createPageActions.setSubtitle(value));
    }, [dispatch]);

    const handleChangeUrlImg = useCallback((value: string) => {
        dispatch(createPageActions.setImgUrl(value));
    }, [dispatch]);

    const handleAddArticleType = useCallback(() => {
        dispatch(createPageActions.setType(articleSelectedType));
    }, [articleSelectedType, dispatch]);

    const handleChangeArticleSelectedType = useCallback((articleType: ArticleType) => {
        dispatch(createPageActions.setSelectedType(articleType));
    }, [dispatch]);

    let content;

    if (isLoading) {
        content = (
            <>
                <SkeletonLoader className={styles.avatar} width={200} height={200} border="50%" />
                <SkeletonLoader className={styles.title} width={340} height={32} />
                <SkeletonLoader className={styles.skeleton} width={600} height={24} />
                <SkeletonLoader className={styles.skeleton} width="100%" height={200} />
                <SkeletonLoader className={styles.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text
                theme={TextTheme.ERROR}
                text={error}
                align={TextAlign.CENTER}
            />
        );
    } else {
        content = (
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
                    <HStack>
                        <ArticleThemes
                            value={t(articleSelectedType)}
                            onChange={handleChangeArticleSelectedType}
                        />
                        <Button
                            onClick={handleAddArticleType}
                        >
                            {t('Добавить категорию')}
                        </Button>
                    </HStack>

                    {blocks?.map(renderBlock)}
                </VStack>
            </VStack>
        );
    }

    return (
        <PageLayout className={classNames(styles.ArticleCreatePage, {}, [className])}>
            {content}
        </PageLayout>
    );
});

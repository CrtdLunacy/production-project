import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import Code from '@/shared/ui/Code/Code';
import { ArticleCodeBlock } from '../../model/types/article';
import styles from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(styles.ArticleCodeBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    );
});

export default ArticleCodeBlockComponent;

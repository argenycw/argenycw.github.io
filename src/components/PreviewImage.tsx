// PreviewImage.tsx

// jQuery
import $ from 'jquery';

// local
import '/src/App.css';
import './PreviewImage.css'
import { useEffect } from 'react';

interface PreviewImageProps {
    title: string;
    src: string;
    onClick: () => void;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ title, src, onClick }) => {

    useEffect(() => {
        //$('[data-toggle="tooltip"]').tooltip();
    }, []);

    return (
        <div className="col-6 gray-filter">
            {/* onClick="window.open('/projects/rendering_project','_blank')"" */}
            <img className="colorable" src={src} style={{width:"100%"}} onClick={onClick} data-toggle="tooltip" title={title} />
        </div>
    )
}

export default PreviewImage;
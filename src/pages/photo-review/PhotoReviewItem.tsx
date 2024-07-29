import Markdown from 'react-markdown';

type Props = {
  rating: number;
  review: string;
  photo: string;
}

export const PhotoReviewItem = ({ rating, review, photo }: Props) => (
  <div className='mt-6 border-2 border-black rounded-xl overflow-hidden'>
     <div className="w-full bg-black" style={{ aspectRatio: '1 / 1' }}>
      <img 
        src={photo} 
        alt="Loaded" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 bg-brand-primary-light text-sm">
      <span>{"Overall Rating: "}</span>
      <span className="font-bold">{`${rating}/100`}</span>
    </div>
    <div className="bg-white p-4">
      <div className="prose prose-base leading-tight">
        <Markdown>{review}</Markdown>
      </div>
    </div>
  </div>
)
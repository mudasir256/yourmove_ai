import FamewallEmbed from 'react-famewall'

type Props = {
  title?: string
  description?: string
  carousal?: boolean
  containerStyle?: string
  backgroundColor?: string
}

export const FamewallReviews = ({
  title = undefined,
  description = undefined,
  carousal = true,
  backgroundColor = undefined,
  containerStyle = undefined,
}: Props) => (
  <div className={`w-screen mt-8 pt-10 ${backgroundColor ? backgroundColor : "bg-brand-secondary"} ${containerStyle}`}>
    {title &&
      <p className='text-center text-xl font-bold text-white'>{title}</p>
    }
    {description &&
      <p className='text-center mt-3 mb-6 text-white'>{description}</p>
    }
    <div className="famewall-embed w-full mt-4" data-src="yourmove" data-format="grid" />
    <script type="text/javascript" src="https://embed.famewall.io/frame.js" defer></script>
    <FamewallEmbed
      wallUrl="yourmove"
      carouselMode={carousal}
    />
  </div>
)
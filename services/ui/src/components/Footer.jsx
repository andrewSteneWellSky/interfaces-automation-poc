import {PrimaryButton} from '@mediwareinc/wellsky-dls-react'

export default function Footer(props, {sendMessageApi})
{
    return(
        <div>
            {props.message !== "" ? 
                <PrimaryButton onClick={()=> sendMessageApi()}>
                    Send Message
                </PrimaryButton>:   
                <PrimaryButton isDisabled>
                    Send Message
                </PrimaryButton>}
        </div>

  
    )
}
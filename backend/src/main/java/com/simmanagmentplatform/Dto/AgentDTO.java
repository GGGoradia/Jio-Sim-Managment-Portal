package com.simmanagmentplatform.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AgentDTO {

    @NotBlank(message = "ICCID is required")
    @Size(min = 10, max = 25, message = "ICCID length must be between 10 and 25")
    private String iccid;

    @NotBlank(message = "Agent is required")
    private String agent;

    @NotBlank(message = "Status is required")
    private String status;

    private String makeModel;

    private String comments;

    public AgentDTO() {}

    public String getIccid() {
        return iccid;
    }

    public void setIccid(String iccid) {
        this.iccid = iccid;
    }

    public String getAgent() {
        return agent;
    }

    public void setAgent(String agent) {
        this.agent = agent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMakeModel() {
        return makeModel;
    }

    public void setMakeModel(String makeModel) {
        this.makeModel = makeModel;
    }
    public String getComments(){
        return comments;
    }
    public void setComments(String comments){
        this.comments=comments;
    }
}

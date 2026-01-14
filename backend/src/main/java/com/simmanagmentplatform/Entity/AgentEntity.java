package com.simmanagmentplatform.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="inventory")
public class AgentEntity {
    @Id
    @Column(name="iccid",length = 25,nullable = false,updatable = false)
    private String iccid;
    
    @Column(name="agent",length=50,unique=true,nullable=false)
    private String agent;

    @Column(name="status",nullable = false)
    private String status;

    @Column(name="make_model",length = 100)
    private String makeModel;

    @Column(name="date_of_entry",nullable = false)
    private LocalDate dateOfEntry;

    public AgentEntity(){

    }
    
    public AgentEntity(String iccid,String agent,String status,String makeModel,LocalDate dateOfEntry){
        this.iccid = iccid;
        this.agent = agent;
        this.status = status;
        this.makeModel = makeModel;
        this.dateOfEntry = dateOfEntry;
    }

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

    public LocalDate getDateOfEntry() {
        return dateOfEntry;
    }

    public void setDateOfEntry(LocalDate dateOfEntry) {
        this.dateOfEntry = dateOfEntry;
    }
}
